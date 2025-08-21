# Redis Cache
resource "azurerm_redis_cache" "tagbot" {
  name                = "tagbot-redis"
  location            = azurerm_resource_group.tagbot.location
  resource_group_name = azurerm_resource_group.tagbot.name
  capacity            = 1
  family              = "C"
  sku_name            = "Basic"
  minimum_tls_version = "1.2"

  # Security settings
  non_ssl_port_enabled         = false
  public_network_access_enabled = true

  redis_configuration {
    authentication_enabled = true
    maxmemory_reserved    = 125
    maxmemory_delta       = 125
    maxfragmentationmemory_reserved = 125
  }
}

# resource "azurerm_private_endpoint" "redis" {
#   name                = "tagbot-redis-endpoint"
#   location            = azurerm_resource_group.tagbot.location
#   resource_group_name = azurerm_resource_group.tagbot.name
#   subnet_id           = azurerm_subnet.tagbot.id
#
#   private_service_connection {
#     name                           = "redis-connection"
#     private_connection_resource_id = azurerm_redis_cache.tagbot.id
#     is_manual_connection           = false
#     subresource_names              = ["redisCache"]
#   }
# }

output "redis_connection_details" {
  value = {
    hostname = azurerm_redis_cache.tagbot.hostname
    port     = azurerm_redis_cache.tagbot.port
    ssl_port = azurerm_redis_cache.tagbot.ssl_port
    primary_key = azurerm_redis_cache.tagbot.primary_access_key
  }
  sensitive = true
}