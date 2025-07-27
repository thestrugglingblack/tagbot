import logging
import os
import sys
from logging.handlers import RotatingFileHandler
from typing import Union


class SimpleLogger:
    LOG_FILE = None

    def __init__(self, name: str, log_dir: str = "logs", level: Union[int, str] = logging.INFO) -> None:
        self.logger = logging.getLogger(name)
        self.logger.setLevel(level)

        if not os.path.exists(log_dir):
            os.makedirs(log_dir)

        if SimpleLogger.LOG_FILE is None:
            SimpleLogger.LOG_FILE = os.path.join(log_dir, "tagbot-application.log")

        file_handler = RotatingFileHandler(SimpleLogger.LOG_FILE, maxBytes=5 * 1024 * 1024, backupCount=5)
        file_handler.setLevel(level)
        file_handler.setFormatter(logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s"))

        if not any(isinstance(h, RotatingFileHandler) for h in self.logger.handlers):
            self.logger.addHandler(file_handler)

    def debug(self, message: str) -> None:
        self.logger.debug(message)

    def info(self, message: str) -> None:
        self.logger.info(message)

    def warning(self, message: str) -> None:
        self.logger.warning(message)

    def error(self, message: str) -> None:
        self.logger.error(message)

    def critical(self, message: str) -> None:
        self.logger.critical(message)

    def exception(self, message: str) -> None:
        self.logger.exception(message)