package com.fss.onboard.domain;

public class FileResponse {

	Long fileId;
    String fileName;
   

	String fileType;
    String fileUri;

    public FileResponse(String fileName, String fileType, String fileUri, Long fileID) {
        this.fileName = fileName;
        this.fileType = fileType;
        this.fileUri = fileUri;
        this.fileId = fileID;
    }

    
    public Long getFileId() {
		return fileId;
	}

	public void setFileId(Long fileId) {
		this.fileId = fileId;
	}
	
	
	
    public String getFileUri() {
        return fileUri;
    }

    public void setFileUri(String fileUri) {
        this.fileUri = fileUri;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

}
