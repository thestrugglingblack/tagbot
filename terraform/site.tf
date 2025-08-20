resource "azurerm_static_web_app" "tagbot" {
  name                = "swa-tagbot-prod"
  resource_group_name = azurerm_resource_group.tagbot.name
  location            = "eastus2"

  sku_tier = "Free"
  sku_size = "Free"

  tags = {
    Environment = "Production"
    Project     = "TagBot"
  }
}

# apex domain: tagbot.gg
resource "azurerm_static_web_app_custom_domain" "root" {
  static_web_app_id = azurerm_static_web_app.tagbot.id
  domain_name       = "tagbot.gg"
  validation_type   = "dns-txt-token"
}

# subdomain: www.tagbot.gg
resource "azurerm_static_web_app_custom_domain" "www" {
  static_web_app_id = azurerm_static_web_app.tagbot.id
  domain_name       = "www.tagbot.gg"
  validation_type   = "dns-txt-token"
}


output "static_web_app_url" {
  value = azurerm_static_web_app.tagbot.default_host_name
}
