import { Upload } from 'antd';
import './App.css';
import { requestByUpload } from './request';

function App() {

  const uploadImage = (info: any) => {
    requestByUpload({
      "size": info.file.size,
      "originname": info.file.name,
      "mimetype": info.file.type,
    }, info.file)
  }

  return (
    <div className="App">
      <Upload
        customRequest={uploadImage}
        >
          <div>上传图片</div>
      </Upload>
    </div >
  );
}

export default App;
