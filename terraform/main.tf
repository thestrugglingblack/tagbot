terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~>4.39.0" # or your pinned version
    }
  }

  # Add my terraform state file
  backend "azurerm" {
    resource_group_name  = "tagbot-resources"
    storage_account_name = "tagbottfstate"
    container_name       = "tfstate"
    key                  = "terraform.tfstate"
  }
}

provider "azurerm" {
  features {}
  resource_provider_registrations = "none"
  # use_cli = true
}

resource "azurerm_resource_group" "tagbot" {
  name = "tagbot-resources"
  location = "East US"
}