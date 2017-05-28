from jav.core.javConfig import Config


class Setup(object):
    """
        Classe used to setup the script (fill configuration settings)
    """

    def __init__(self, log, app_config):
        self.log = log
        self.config = Config(self.log)

        # This section is used to set-up log files
        self.app_config = app_config
        self.app_config.set(self.log._meta.config_section, 'file', self.config.config_path + 'setup.log')
        self.app_config.set(self.log._meta.config_section, 'rotate', True)
        self.app_config.set(self.log._meta.config_section, 'max_bytes', 512000)
        self.app_config.set(self.log._meta.config_section, 'max_files', 10)
        self.log._setup_file_log()

    def main(self):
        self.log.info('Initiating App Setup')
        self.config.init_config()