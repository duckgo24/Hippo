
import axios from 'axios';

function GetLinkVideo(file) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/upload/video`, {
              video: file,
            }, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            
            resolve(response.data?.url);
          } catch (error) {
            console.error('Có lỗi xảy ra khi tải lên:', error);
            reject(error);
          }
    });

}

export default GetLinkVideo;