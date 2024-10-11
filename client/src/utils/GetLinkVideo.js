
import axios from 'axios';

function GetLinkVideo(formData) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/upload/video`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            console.log(response.data);
            
            resolve(response.data?.url);
          } catch (error) {
            console.error('Có lỗi xảy ra khi tải lên:', error);
            reject(error);
          }
    });

}

export default GetLinkVideo;