# Virtual Network
resource "azurerm_virtual_network" "tagbot" {
  name                = "tagbot-network"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.tagbot.location
  resource_group_name = azurerm_resource_group.tagbot.name
}

# Internal Subnet for TagBot
resource "azurerm_subnet" "tagbot" {
  name                 = "internal"
  resource_group_name  = azurerm_resource_group.tagbot.name
  virtual_network_name = azurerm_virtual_network.tagbot.name
  address_prefixes     = ["10.0.2.0/24"]
}

# Network Security Group for TagBot
resource "azurerm_network_security_group" "tagbot" {
  name                = "tagbot-security-group"
  location            = azurerm_resource_group.tagbot.location
  resource_group_name = azurerm_resource_group.tagbot.name

  security_rule {
    name                       = "AllowCouchbase"
    priority                   = 1001
    direction                  = "Outbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_ranges    = ["8091-8096", "18091-18096", "11210"]
    source_address_prefix      = "10.0.2.0/24"
    destination_address_prefix = "10.0.3.0/24"
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

# Associate Network Security Group to TagBot Subnet
resource "azurerm_subnet_network_security_group_association" "tagbot" {
  subnet_id                 = azurerm_subnet.tagbot.id
  network_security_group_id = azurerm_network_security_group.tagbot.id
}

