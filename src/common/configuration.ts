import * as process from 'process';

export default () => ({
  const config = yaml.load(
    readFileSync(join(__dirname, YAML_CONFIG_FILENAME), 'utf8'),
  ) as Record;

  if (config.http.port 49151) {
    throw new Error('HTTP 포트는 1024와 49151 사이여야 합니다.');
  }

  return config;
});
