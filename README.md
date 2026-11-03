# Google Apps Scripts (GAS) ⚡

Repositório organizado com scripts, integrações e automações desenvolvidos em **Google Apps Script** para Google Sheets, Google Docs, Gmail, Google Drive, Google Calendar e APIs externas.

---

## 📁 Estrutura do Repositório

```text
GoogleAppsScripts/
├── integrations_apis/                  # Integrações com serviços e APIs externas
│   ├── google-sheets-functions-to-trello-api.gs  # Automação do Trello (quadros, listas, cartões)
│   ├── google-sheets-functions-to-zoom-api.gs    # Criação e gestão de reuniões no Zoom
│   ├── scriptToScheduleZoomMeetings.gs           # Agendador de reuniões Zoom via planilha e Calendar
│   ├── zoom_to_drive/                            # Backup automático de gravações Zoom no Google Drive
│   ├── paypal/                                   # Integração com API do PayPal (token e taxas)
│   ├── sendEmailViaSendGrid.gs                   # Envio de e-mails transacionais via SendGrid API
│   ├── postToWordPressFromGoogleSheets.gs        # Publicação de posts no WordPress via e-mail
│   ├── queryAPITextRazor.gs                      # Extração de tópicos e NLP via TextRazor
│   ├── quickchart.gs                             # Geração de gráficos e códigos de barras com QuickChart
│   ├── callZapierWebhook.gs                      # Disparo de webhooks para o Zapier
│   ├── fromGooglePlacesToSheet.gs                # Busca de estabelecimentos na Google Places API
│   ├── getFeeAmountFromPagSeguroApi.gs           # Cálculo de taxas de transação PagSeguro
│   └── importJurusDataToSpreadsheet.gs           # Importação de títulos e taxas via API Jurus
│
├── sheets_utilities/                   # Utilitários, fórmulas e automações para Google Sheets
│   ├── transformGoogleSheetInAPI.gs              # Transforma a planilha em uma REST API (doGet / doPost)
│   ├── SQLQueryToGoogleSpreadSheet.gs            # Conexão JDBC Cloud SQL para consulta direta na planilha
│   ├── generateJSON.gs                           # Exporta dados tabulares em estrutura JSON hierárquica
│   ├── splitCellToRows.gs                        # Divide células com múltiplos valores em novas linhas
│   ├── fulfilColumn.gs                           # Preenchimento automático de colunas por trigger
│   ├── findRow.gs                                # Busca indexada de linhas por chave
│   ├── filter_array_2_dimension.gs               # Filtragem de matrizes bidimensionais em memória
│   ├── buildSankeyGraph3Levels.gs                # Geração de Diagrama Sankey (3 níveis) com Google Charts
│   ├── random1-1.gs                              # Sorteador de reuniões 1-on-1 para squads
│   └── unixTimestampToDate.gs                    # Função customizada para converter timestamps Unix
│
├── google_workspace/                   # Automações internas do ecossistema Google
│   ├── emailManagement/                         # Sistema de disparo de e-mails em lote com templates
│   ├── formToPdf/                               # Geração de Google Docs e PDF a partir de Google Forms
│   ├── getMailToSpreadsheet.gs                   # Leitura de mensagens do Gmail para o Google Sheets
│   ├── getDataFromEmail.gs                       # Extração de URLs e metadados OpenGraph de e-mails
│   ├── createEvent.gs                            # Criação automatizada de eventos no Google Calendar
│   ├── getFoldersFromFolder.gs                   # Varredura hierárquica de pastas no Google Drive
│   ├── extractSpeechFromPdf.gs                   # Extração de texto/discursos de PDFs no Drive
│   ├── createKeyFromEmail.gs                     # Geração de identificador/chave a partir de e-mail
│   └── checkFreeEmails.gs                        # Validador de provedores de e-mail gratuitos/descartáveis
│
├── ai_nlp/                             # IA, LLMs e Processamento de Linguagem Natural
│   ├── assistantOpenaiWithFile/                  # WebApp com interface para OpenAI Assistants com upload de arquivos
│   ├── checkNames.gs                             # Validação e correção de nomes com OpenAI API e ScriptProperties
│   └── translateEN2PT.gs                         # Tradução rápida via LanguageApp (EN -> PT)
│
├── finance_crypto/                     # Mercado financeiro e rastreadores de Criptomoedas
│   ├── bitcoin_value_and_compare_currencies.gs   # Monitor de preço do Bitcoin e comparativo cambial
│   └── getCryptoInDollar.gs                      # Conversão de criptoativos para USD via CoinMarketCap
│
└── tutorials_and_demos/                # Material didático e demonstrações
    ├── introToGoogleAppsScript.gs                # Introdução à sintaxe, estruturas e APIs no GAS
    ├── fiapApi.gs / fiapFunction.gs / fiapMenu.gs # Exemplos de aulas da FIAP (menus e consumo de APIs)
    └── tfnt_dia_14.gs / tfnt-15.gs               # Exercícios de workshops e APIs de consulta CNPJ
```

---

## 🚀 Como Utilizar

### 1. Inserir os scripts em um documento Google
1. Abra a sua planilha (Google Sheets), documento (Google Docs) ou formulário (Google Forms).
2. No menu superior, acesse **Extensões** > **Apps Script**.
3. Copie o código do arquivo `.gs` correspondente e cole no editor.
4. Salve e autorize as permissões necessárias na primeira execução.

### 2. Uso com Google Clasp (Command Line Apps Script Projects)
Caso prefira desenvolver localmente no terminal:
```bash
# Instalar clasp globalmente
npm install -g @google/clasp

# Fazer login no Google
clasp login

# Criar ou clonar um projeto existente
clasp clone "<SCRIPT_ID>"
clasp push
```

---

## 🔒 Segurança e Gestão de Segredos

> [!IMPORTANT]
> **Nunca armazene chaves de API, senhas ou tokens diretamente no código.**

Para manter seus scripts seguros em produção:
1. No editor do Apps Script, clique em **Configurações do Projeto** (ícone de engrenagem).
2. Role até a seção **Propriedades do script** e adicione as variáveis necessárias (ex: `OPENAI_API_KEY`, `ZOOM_TOKEN`, `TRELLO_KEY`).
3. No seu código `.gs`, acesse a chave de forma segura:
   ```javascript
   const apiKey = PropertiesService.getScriptProperties().getProperty('OPENAI_API_KEY');
   ```

O arquivo [`.gitignore`](.gitignore) já está configurado para evitar o versionamento acidental de tokens de autenticação do Clasp (`.clasprc.json`), credenciais e arquivos de ambiente locais.
