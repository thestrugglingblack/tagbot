# Couchbase Configuration
variable "couchbase_vm_size" {
  description = "Size of the Couchbase VM"
  type        = string
  default     = "Standard_D2s_v3"  # Better for Couchbase workloads
}

variable "couchbase_admin_username" {
  description = "Admin username for Couchbase VM"
  type        = string
  default     = "adminuser"
}

variable "couchbase_admin_password" {
  description = "Admin password for Couchbase cluster"
  type        = string
  sensitive   = true
  default     = "passwordpassword"
}

variable "couchbase_cluster_name" {
  description = "Name of the Couchbase cluster"
  type        = string
  default     = "tagbot-cluster"
}

variable "ssh_public_key_path" {
  description = "Path to SSH public key file"
  type        = string
  default     = "~/.ssh/id_rsa.pub"
}


# # Security Configuration
# variable "allowed_source_addresses" {
#   description = "Allowed source address prefixes for network security rules"
#   type        = list(string)
#   default     = ["10.0.2.0/24"]
# }
#
# variable "couchbase_admin_ports" {
#   description = "Couchbase admin port ranges"
#   type        = list(string)
#   default     = ["8091-8096"]
# }

# variable "couchbase_ssl_ports" {
#   description = "Couchbase SSL port ranges"
#   type        = list(string)
#   default     = ["18091-18096"]
# }
#
# variable "couchbase_data_port" {
#   description = "Couchbase data port"
#   type        = string
#   default     = "11210"
# }

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
