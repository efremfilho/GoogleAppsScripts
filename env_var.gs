function setEnvironmentVariable() {
  const scriptProperties = PropertiesService.getScriptProperties();
  scriptProperties.setProperty('OPENAI_API_KEY', '[YOUR KEY]]');
  scriptProperties.setProperty('ASSISTANT_ID', '[YOUR ASSISTANT]]');
}
