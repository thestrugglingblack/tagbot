import os
from dotenv import dotenv_values

def check_env():
    """
    Check if the required environment variables have been set.

    Raises:
        ValueError: If any of the required environment variables are missing or empty.
    """

    # Check if the .env file exists before anything else
    if not os.path.isfile(".env"):
        raise FileNotFoundError(".env file is missing. Please create one in order to run the Roarwise application")

    # Reads .env file for filled out values
    env_vars = dotenv_values(".env")
    missing_vars = []
    for var_name, var_value in env_vars.items():
        if not var_value:
            missing_vars.append(var_name)

    if missing_vars:
        raise ValueError(f"Missing Environment Variables: {', '.join(missing_vars)}")