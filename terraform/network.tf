# Virtual Network
resource "azurerm_virtual_network" "tagbot" {
  name                = "tagbot-network"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.tagbot.location
  resource_group_name = azurerm_resource_group.tagbot.name
}

# Public IP for NAT Gateway for Tagbot to talk to the internet
resource "azurerm_public_ip" "nat_gateway" {
  name                = "tagbot-nat-gateway-ip"
  location            = azurerm_resource_group.tagbot.location
  resource_group_name = azurerm_resource_group.tagbot.name
  allocation_method   = "Static"
  sku                = "Standard"
}

# NAT Gateway for tagbot to talk to the internet
resource "azurerm_nat_gateway" "tagbot" {
  name                = "tagbot-nat-gateway"
  location            = azurerm_resource_group.tagbot.location
  resource_group_name = azurerm_resource_group.tagbot.name
  sku_name           = "Standard"
}

# Associate Public IP with NAT Gateway to talk to the internet for tagbot
resource "azurerm_nat_gateway_public_ip_association" "tagbot" {
  nat_gateway_id       = azurerm_nat_gateway.tagbot.id
  public_ip_address_id = azurerm_public_ip.nat_gateway.id
}

# Network Security Group for TagBot
resource "azurerm_network_security_group" "tagbot" {
  name                = "tagbot-security-group"
  location            = azurerm_resource_group.tagbot.location
  resource_group_name = azurerm_resource_group.tagbot.name

  security_rule {
    name                       = "AllowCouchbaseCapella"
    priority                   = 1001
    direction                  = "Outbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "443"
    source_address_prefix      = "10.0.2.0/24"
    destination_address_prefix = "*"
  }

  security_rule {
    name                       = "AllowRedis"
    priority                   = 1002
    direction                  = "Outbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "6380"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }
}

resource "azurerm_subnet" "tagbot" {
  name                 = "internal-tagbot-subnet"
  resource_group_name  = azurerm_resource_group.tagbot.name
  virtual_network_name = azurerm_virtual_network.tagbot.name
  address_prefixes     = ["10.0.2.0/24"]

  # Add this delegation block for Container Instances
  delegation {
    name = "container-delegation"

    service_delegation {
      name    = "Microsoft.ContainerInstance/containerGroups"
      actions = [
        "Microsoft.Network/virtualNetworks/subnets/action",
      ]
    }
  }
}

# Associate Network Security Group to TagBot Subnet
resource "azurerm_subnet_network_security_group_association" "tagbot" {
  subnet_id                 = azurerm_subnet.tagbot.id
  network_security_group_id = azurerm_network_security_group.tagbot.id
}

# Associate NAT Gateway with TagBot Subnet
resource "azurerm_subnet_nat_gateway_association" "tagbot" {
  subnet_id      = azurerm_subnet.tagbot.id
  nat_gateway_id = azurerm_nat_gateway.tagbot.id
}