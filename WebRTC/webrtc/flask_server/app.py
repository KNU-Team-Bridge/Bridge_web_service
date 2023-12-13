from flask import Flask, request, jsonify
import numpy as np
import cv2
from yolo_detection import performDetect
import base64

app = Flask(__name__)

@app.route('/process_image', methods=['POST'])
def process_image():
    data = request.get_json()  # JSON 데이터를 파싱
    image_data = base64.b64decode(data['image'])
    image = np.frombuffer(image_data, dtype=np.uint8)
    image = cv2.imdecode(image, flags=cv2.IMREAD_COLOR)
    
    # YOLO 모델을 사용하여 이미지 처리
    results = performDetect(image=image)

    # 감지된 객체의 정보를 반환
    return jsonify(results)

if __name__ == '__main__':
	app.run(debug=True, port=5000)
