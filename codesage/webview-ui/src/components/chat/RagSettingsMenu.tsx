import { useState } from "react";
import { vscode } from "../../utils/vscode";
import { VSCodeTextField, VSCodeButton } from "@vscode/webview-ui-toolkit/react";

const renderLabeledTextField = (
  label: string,
  key: string,
  value: string,
  onChange: (key: string, value: string) => void,
  type: "text" | "password" = "text",
) => (
  <div
    className="glass-effect"
    style={{
      display: "flex",
      flexDirection: "column",
      marginBottom: "8px",
    }}
  >
    <label
      htmlFor={key}
      style={{
        color: "var(--vscode-descriptionForeground)",
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: "1px",
        fontSize: "8px",
        marginBottom: "4px",
        textShadow: "0 0 5px var(--vscode-textLink-foreground)",
      }}
    >
      {label}
    </label>
    <VSCodeTextField
      id={key}
      type={type}
      value={value}
      onInput={(e) => {
        const target = e.target as HTMLInputElement;
        if (target) {
          onChange(key, target.value);
        }
      }}
      placeholder={label}
      style={{
        backgroundColor: "transparent",
        border: "1px solid var(--vscode-input-background)",
        borderRadius: "4px",
        boxShadow: "0 0 10px var(--vscode-textLink-foreground)",
      }}
    />
  </div>
);

interface RagSettingsMenuProps {
  style?: React.CSSProperties;
  // isExpanded?: boolean;
  // toggleExpanded?: () => void;
  onSave?: (settings: Record<string, string>) => void;
}

const RagSettingsMenu = ({ 
  style,
  // isExpanded,
  // toggleExpanded,
  onSave,
}: RagSettingsMenuProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };
  const [settings, setSettings] = useState({
    PINECONE_API_KEY: "pcsk_...",
    PINECONE_INDEX_NAME: "singaparna",
    PINECONE_NAMESPACE: "default",
    OPENAI_API_KEY: "sk-...",
    EMBEDDING_MODEL_NAME: "text-embedding-3-small",
    RAG_FOLDER_PATH: "C:\\hapus\\upwork\\codesage\\src\\core\\webview",
    CHUNK_MAX_TOKENS: "100",
    QUERY_TOP_K: "5",
    TEXT_SPLITTER_CHUNK_SIZE: "1000",
    TEXT_SPLITTER_CHUNK_OVERLAP: "200",
  });

  const handleInputChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (onSave) {
      onSave(settings);
    }
    vscode.postMessage({
      type: "updateRagConfig",
      ragConfig: settings,
    });
    console.log("Saving RAG settings:", settings);
  };

  return (
    <div 
      className="glass-effect"
      style={{ 
        display: "flex",
        flexDirection: "column",
        gap: "2px",
        overflowY: "auto",
        ...style,
      }}>
      {/* Collapsed View */}
      <div
        onClick={toggleExpanded}
        style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          padding: "2px",
          // margin: "2px",
          border: "1px solid var(--vscode-toolbar-hoverBackground)",
          borderRadius: "4px",
        }}
      >
        {/* <span>RAG Settings</span> */}
        <div
				style={{
					color: "var(--vscode-descriptionForeground)",
					margin: "2px 5px 2px 15px",
          
					display: "flex",
					alignItems: "center",
				}}>
				<span
					className="codicon codicon-comment-discussion"
					style={{ marginRight: "4px", transform: "scale(0.9)" }}></span>
				<span
					style={{
						fontWeight: 500,
						fontSize: "0.8em",
						textTransform: "uppercase",
					}}>
					RAG Settings
				</span>
			</div>

        {/* force arrow to align right */}
        <span
						style={{
							color: "var(--vscode-descriptionForeground)",
							overflow: "hidden",
							textOverflow: "ellipsis",
							whiteSpace: "nowrap",
							flex: 1,
							minWidth: 0,
						}}>
					</span>

        {/* <span style={{ marginLeft: "auto" }}>▶</span> */}
        <span
						className={`codicon codicon-chevron-${isExpanded ? "down" : "right"} neon-green`}
						style={{
							flexShrink: 0,
							marginLeft: isExpanded ? "2px" : "-2px",
						}}
					/>
      </div>
      {/* Expanded View */}
      {isExpanded && (
        <div
          style={{
            padding: "8px",
            border: "1px solid var(--vscode-toolbar-hoverBackground)",
            borderRadius: "4px",
          }}
        >


          <h4>OPENAI</h4>
          {renderLabeledTextField("OpenAI API Key", "OPENAI_API_KEY", settings.OPENAI_API_KEY, handleInputChange, "password")}
          {renderLabeledTextField("Embedding Model Name", "EMBEDDING_MODEL_NAME", settings.EMBEDDING_MODEL_NAME, handleInputChange)}
          <h4>PINECONE</h4>
          {renderLabeledTextField("Pinecone API Key", "PINECONE_API_KEY", settings.PINECONE_API_KEY, handleInputChange, "password")}
          {renderLabeledTextField("Pinecone Index Name", "PINECONE_INDEX_NAME", settings.PINECONE_INDEX_NAME, handleInputChange)}
          {renderLabeledTextField("Pinecone Namespace", "PINECONE_NAMESPACE", settings.PINECONE_NAMESPACE, handleInputChange)}
          <h4>RAG</h4>
          {renderLabeledTextField("RAG Folder Path", "RAG_FOLDER_PATH", settings.RAG_FOLDER_PATH, handleInputChange)}
          {renderLabeledTextField("Chunk Max Tokens", "CHUNK_MAX_TOKENS", settings.CHUNK_MAX_TOKENS, handleInputChange)}
          {renderLabeledTextField("Query Top K", "QUERY_TOP_K", settings.QUERY_TOP_K, handleInputChange)}
          {renderLabeledTextField("Text Splitter Chunk Size", "TEXT_SPLITTER_CHUNK_SIZE", settings.TEXT_SPLITTER_CHUNK_SIZE, handleInputChange)}
          {renderLabeledTextField("Text Splitter Chunk Overlap", "TEXT_SPLITTER_CHUNK_OVERLAP", settings.TEXT_SPLITTER_CHUNK_OVERLAP, handleInputChange)}

          <VSCodeButton 
            className="glass-effect neon-border"
            onClick={handleSubmit}>Save</VSCodeButton>
        </div>
      )}
    </div>
  );
};

export default RagSettingsMenu;
