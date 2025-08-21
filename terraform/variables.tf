variable "ssh_public_key_path" {
  description = "Path to SSH public key file"
  type        = string
  default     = "~/.ssh/id_rsa.pub"
}

variable "redis_ssl_port" {
  description = "Redis SSL port"
  type        = string
  default     = "6380"
}

variable "couchbase_version" {
  description = "Version of Couchbase to install"
  type        = string
  default     = "7.2.0"
}

variable "common_tags" {
  description = "Common tags for all resources"
  type        = map(string)
  default = {
    Environment = "Production"
    Project     = "TagBot"
  }
}

# Discord Bot Configuration Variables

variable "discord_bot_image" {
  description = "Docker image for Discord bot"
  type        = string
  default     = "ghcr.io/thestrugglingblack/tagbot:latest"
}

variable "discord_token" {
  description = "Discord bot token"
  type        = string
  sensitive   = true
}

variable "discord_application_id" {
  description = "Discord application ID"
  type        = string
}

variable "discord_public_id" {
  description = "Discord public ID"
  type        = string
}

variable "couchbase_bucket_name" {
  description = "Couchbase bucket name"
  type        = string
}

variable "couchbase_collection" {
  description = "Couchbase collection name"
  type        = string
}

variable "couchbase_scope" {
  description = "Couchbase scope name"
  type        = string
}

variable "tag_expiration" {
  description = "Tag expiration time in seconds"
  type        = string
  default     = "3600"
}

variable "couchbase_connection_string" {
  description = "Couchbase connection string"
  type        = string
}

variable "couchbase_admin_username" {
  description = "Admin username for Couchbase"
  type        = string
}

variable "couchbase_admin_password" {
  description = "Admin password for Couchbase"
  type        = string
  sensitive   = true
}