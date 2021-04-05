package com.fss.onboard.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * A FileModel.
 */
@Entity
@Table(name = "file_model")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class FileModel implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
	@SequenceGenerator(name = "sequenceGenerator")
	private Long id;

	@Column(name = "file_name")
	private String fileName;

	@Column(name = "file_type")
	private String fileType;

	@Lob
	@Column(name = "image_data")
	private byte[] imageData;

	@Column(name = "image_data_content_type")
	private String imageDataContentType;

	@ManyToOne
	@JsonIgnoreProperties(value = "fileModels", allowSetters = true)
	private BuisnessInfo buisnessInfo;

	public FileModel(String fileName, String fileType) {

		this.fileName = fileName;
		this.fileType = fileType;

	}

	public FileModel(String fileName, String fileType, byte[] imageData) {

		this.fileName = fileName;
		this.fileType = fileType;
		this.imageData = imageData;
	}

	public FileModel() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFileName() {
		return fileName;
	}

	public FileModel fileName(String fileName) {
		this.fileName = fileName;
		return this;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getFileType() {
		return fileType;
	}

	public FileModel fileType(String fileType) {
		this.fileType = fileType;
		return this;
	}

	public void setFileType(String fileType) {
		this.fileType = fileType;
	}

	public byte[] getImageData() {
		return imageData;
	}

	public FileModel imageData(byte[] imageData) {
		this.imageData = imageData;
		return this;
	}

	public void setImageData(byte[] imageData) {
		this.imageData = imageData;
	}

	public String getImageDataContentType() {
		return imageDataContentType;
	}

	public FileModel imageDataContentType(String imageDataContentType) {
		this.imageDataContentType = imageDataContentType;
		return this;
	}

	public void setImageDataContentType(String imageDataContentType) {
		this.imageDataContentType = imageDataContentType;
	}

	public BuisnessInfo getBuisnessInfo() {
		return buisnessInfo;
	}

	public FileModel buisnessInfo(BuisnessInfo buisnessInfo) {
		this.buisnessInfo = buisnessInfo;
		return this;
	}

	public void setBuisnessInfo(BuisnessInfo buisnessInfo) {
		this.buisnessInfo = buisnessInfo;
	}
	// jhipster-needle-entity-add-getters-setters - JHipster will add getters and
	// setters here

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (!(o instanceof FileModel)) {
			return false;
		}
		return id != null && id.equals(((FileModel) o).id);
	}

	@Override
	public int hashCode() {
		return 31;
	}

	// prettier-ignore
	@Override
	public String toString() {
		return "FileModel{" + "id=" + getId() + ", fileId='" + "'" + ", fileName='" + getFileName() + "'"
				+ ", fileType='" + getFileType() + "'" + ", imageData='" + getImageData() + "'"
				+ ", imageDataContentType='" + getImageDataContentType() + "'" + "}";
	}
}
