# Redis Hostname
output "redis_hostname" {
  value = azurerm_redis_cache.tagbot.hostname
}

# Redis SSL Port
output "redis_ssl_port" {
  value = azurerm_redis_cache.tagbot.ssl_port
}

# Resource Group Name
output "resource_group_name" {
  value = azurerm_resource_group.tagbot.name
}

# Virtual Network ID
output "virtual_network_id" {
  value = azurerm_virtual_network.tagbot.id
}

# Subnet IDs
output "tagbot_subnet_id" {
  value = azurerm_subnet.tagbot.id
}

output "nat_gateway_public_ip" {
  description = "Public IP address of the NAT Gateway"
  value       = azurerm_public_ip.nat_gateway.ip_address
}
