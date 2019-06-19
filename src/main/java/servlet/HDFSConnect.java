package servlet;

import java.io.IOException;
import java.net.URI;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileSystem;


public class HDFSConnect {
	private String hdfsURL;
	private FileSystem fs;
	private Configuration conf;
	private String ip;
	private String port;
	
	public HDFSConnect(String ip, String port) throws IOException{
		this.ip = ip;
		this.port = port;
		this.hdfsURL = "hdfs://" + ip + ":" + port;
		this.conf = new Configuration();
		this.fs = FileSystem.get(URI.create(hdfsURL), conf);
	}

	public void closeFileSystem() throws IOException{
		this.fs.close();
	}
	
	
	public String getHdfsURL() {
		return hdfsURL;
	}

	public void setHdfsURL(String hdfsURL) {
		this.hdfsURL = hdfsURL;
	}

	public FileSystem getFs() {
		return fs;
	}

	public void setFs(FileSystem fs) {
		this.fs = fs;
	}

	public Configuration getConf() {
		return conf;
	}

	public void setConf(Configuration conf) {
		this.conf = conf;
	}

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public String getPort() {
		return port;
	}

	public void setPort(String port) {
		this.port = port;
	}
	
	
	
}
