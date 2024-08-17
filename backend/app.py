from flask import Flask,request,jsonify
from flask_cors import CORS
import joblib
import os

from face_feature_extractor.feature_extractor import get_face_encoding
from predictor.prediction import predict_height_width_BMI

height_model_path = os.path.join(os.path.dirname(__file__), '..', 'models', 'height_model')
weight_model_path = os.path.join(os.path.dirname(__file__), '..', 'models', 'weight_model')
bmi_model_path = os.path.join(os.path.dirname(__file__), '..', 'models', 'bmi_model')

height_model = joblib.load(height_model_path)
weight_model = joblib.load(weight_model_path)
bmi_model = joblib.load(bmi_model_path)

app = Flask(__name__, static_folder='build', static_url_path='/')
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/')
def serve_index():
    return app.send_static_file('index.html')
      
@app.route("/predict",methods=['POST'])
def post_image():
    data = request.files['file']
    print(data)
    features = get_face_encoding(data)
    result = predict_height_width_BMI(features,height_model,weight_model,bmi_model)
    print(result)
    return jsonify(result),200

if __name__ == "__main__":
    app.run(debug=True)
