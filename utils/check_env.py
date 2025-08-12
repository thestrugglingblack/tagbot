import os
from dotenv import dotenv_values


def check_env():
    """
    Check if the required environment variables have been set in the .env file.

    This function verifies that:
    1. The .env file exists in the current directory
    2. All environment variables defined in the .env file have values

    Raises:
        FileNotFoundError: If the .env file does not exist in the current directory.
        ValueError: If any environment variables in the .env file are empty or not set.
            The error message will list all missing variables.

    Returns:
        None: The function returns nothing if all checks pass.
    """

    # Check if the .env file exists before anything else
    if not os.path.isfile(".env"):
        raise FileNotFoundError(
            ".env file is missing. Please create one in order to run the Roarwise application"
        )

    # Reads .env file for filled out values
    env_vars = dotenv_values(".env")
    missing_vars = []
    for var_name, var_value in env_vars.items():
        if not var_value:
            missing_vars.append(var_name)

    if missing_vars:
        raise ValueError(f"Missing Environment Variables: {', '.join(missing_vars)}")
