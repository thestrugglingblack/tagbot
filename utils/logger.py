"""
Logging configuration module.

This module provides a simple logging interface that writes log messages to both
console and rotating file outputs with consistent formatting.

Classes:
    SimpleLogger: A wrapper class for the standard Python logging module that simplifies
                 configuration and usage.
"""
import logging
import os
import sys
from logging.handlers import RotatingFileHandler
from typing import Union


class SimpleLogger:
    """
    A simplified logging interface that writes to both console and file.

    This class wraps the standard Python logging module to provide an easy-to-use
    logging interface with consistent formatting and automatic log rotation.
    All instances share the same log file but can have different logger names.

    Attributes:
        LOG_FILE (str): Class-level attribute storing the path to the log file.
        logger (logging.Logger): The underlying logger instance.
    """
    LOG_FILE = None

    def __init__(
        self, name: str, log_dir: str = "logs", level: Union[int, str] = logging.INFO
    ) -> None:
        """
        Initialize a new logger instance.

        Args:
            name (str): The name of the logger, typically the module name.
            log_dir (str, optional): Directory to store log files. Defaults to "logs".
            level (Union[int, str], optional): The logging level. Defaults to logging.INFO.

        Note:
            Creates the log directory if it doesn't exist.
            All SimpleLogger instances share the same log file.
        """
        self.logger = logging.getLogger(name)
        self.logger.setLevel(level)

        if not os.path.exists(log_dir):
            os.makedirs(log_dir)

        if SimpleLogger.LOG_FILE is None:
            SimpleLogger.LOG_FILE = os.path.join(log_dir, "tagbot-application.log")

        file_handler = RotatingFileHandler(
            SimpleLogger.LOG_FILE, maxBytes=5 * 1024 * 1024, backupCount=5
        )
        file_handler.setLevel(level)
        file_handler.setFormatter(
            logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")
        )

        if not any(isinstance(h, RotatingFileHandler) for h in self.logger.handlers):
            self.logger.addHandler(file_handler)

    def debug(self, message: str) -> None:
        """
        Log a message at DEBUG level.

        Args:
            message (str): The message to log.

        Example:
            >>> logger = SimpleLogger("my_module")
            >>> logger.debug("Processing item 42")
        """
        self.logger.debug(message)

    def info(self, message: str) -> None:
        """
        Log a message at INFO level.

        Args:
            message (str): The message to log.

        Example:
            >>> logger = SimpleLogger("my_module")
            >>> logger.info("Application initialized successfully")
        """
        self.logger.info(message)

    def warning(self, message: str) -> None:
        """
        Log a message at WARNING level.

        Args:
            message (str): The message to log.

        Example:
            >>> logger = SimpleLogger("my_module")
            >>> logger.warning("Configuration file missing, using defaults")
        """
        self.logger.warning(message)

    def error(self, message: str) -> None:
        """
         Log a message at ERROR level.

         Args:
             message (str): The message to log.

         Example:
             >>> logger = SimpleLogger("my_module")
             >>> logger.error("Failed to connect to database")
         """
        self.logger.error(message)

    def critical(self, message: str) -> None:
        """
        Log a message at CRITICAL level.

        Args:
            message (str): The message to log.

        Example:
            >>> logger = SimpleLogger("my_module")
            >>> logger.critical("System is out of disk space")
        """
        self.logger.critical(message)

    def exception(self, message: str) -> None:
        """
        Log a message at ERROR level including exception information.

        This method should only be called from an exception handler.

        Args:
            message (str): The message to log.

        Example:
            >>> logger = SimpleLogger("my_module")
            >>> try:
            ...     result = risky_operation()
            ... except Exception:
            ...     logger.exception("Error during risky operation")
        """
        self.logger.exception(message)
