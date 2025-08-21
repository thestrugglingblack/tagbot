# Storage account for persistent logs
resource "random_string" "storage_suffix" {
  length  = 6
  special = false
  upper   = false
}

resource "azurerm_storage_account" "tagbot_logs" {
  name                     = "tagbotlogs${random_string.storage_suffix.result}"
  resource_group_name      = azurerm_resource_group.tagbot.name
  location                 = azurerm_resource_group.tagbot.location
  account_tier             = "Standard"
  account_replication_type = "LRS"

  tags = var.common_tags
}

# File share for logs
resource "azurerm_storage_share" "tagbot_logs" {
  name                 = "tagbot-logs"
  storage_account_id   = azurerm_storage_account.tagbot_logs.id  # Use storage_account_id instead
  quota                = 1  # 1GB should be plenty for logs
}
# Updated container group with mounted logs directory
resource "azurerm_container_group" "tagbot_discord" {
  name                = "tagbot-discord-bot"
  location            = azurerm_resource_group.tagbot.location
  resource_group_name = azurerm_resource_group.tagbot.name
  ip_address_type     = "None"
  os_type             = "Linux"
  restart_policy      = "Always"
  subnet_ids          = [azurerm_subnet.tagbot.id]

  container {
    name   = "tagbot-container"
    image  = var.discord_bot_image
    cpu    = "0.5"
    memory = "1.0"

    # Mount Azure File Share to /app/logs
    volume {
      name                 = "logs"
      mount_path           = "/app/logs"  # This matches your SimpleLogger log_dir
      read_only            = false
      storage_account_name = azurerm_storage_account.tagbot_logs.name
      storage_account_key  = azurerm_storage_account.tagbot_logs.primary_access_key
      share_name           = azurerm_storage_share.tagbot_logs.name
    }

    # Environment variables for the bot
    environment_variables = {
      "DISCORD_APPLICATION_ID" = var.discord_application_id
      "DISCORD_PUBLIC_ID"      = var.discord_public_id
      "COUCHBASE_USERNAME"     = var.couchbase_admin_username
      "COUCHBASE_BUCKET_NAME"  = var.couchbase_bucket_name
      "COUCHBASE_COLLECTION"   = var.couchbase_collection
      "COUCHBASE_SCOPE"        = var.couchbase_scope
      "TAG_EXPIRATION"         = var.tag_expiration
      "COUCHBASE_CONNECTION"   = var.couchbase_connection_string
      "REDIS_HOST"            = azurerm_redis_cache.tagbot.hostname
      "REDIS_PORT"            = "6380"
      "REDIS_SSL"             = "true"
    }

    # Secure environment variables (stored in Azure Key Vault or Terraform sensitive vars)
    secure_environment_variables = {
      "DISCORD_TOKEN"      = var.discord_token
      "COUCHBASE_PASSWORD" = var.couchbase_admin_password
      "REDIS_PASSWORD"     = azurerm_redis_cache.tagbot.primary_access_key
    }
  }

  tags = var.common_tags
}

# Commands to access persistent logs
output "list_log_files" {
  value = "az storage file list --share-name bot-logs --account-name ${azurerm_storage_account.tagbot_logs.name} --account-key ${azurerm_storage_account.tagbot_logs.primary_access_key}"
  description = "Command to list all log files"
  sensitive = true
}

output "download_main_log" {
  value = "az storage file download --share-name bot-logs --path 'tagbot-application.log' --dest './tagbot-application.log' --account-name ${azurerm_storage_account.tagbot_logs.name} --account-key ${azurerm_storage_account.tagbot_logs.primary_access_key}"
  description = "Command to download main log file"
  sensitive = true
}