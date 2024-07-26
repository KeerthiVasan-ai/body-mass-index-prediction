from flask import Flask,request,jsonify
from flask_cors import CORS
import joblib

from face_feature_extractor.feature_extractor import get_face_encoding
from predictor.prediction import predict_height_width_BMI

height_model = joblib.load("D:\\FACE-BMI\\models\\height_model")
weight_model = joblib.load("D:\\FACE-BMI\\models\\weight_model")
bmi_model = joblib.load("D:\\FACE-BMI\\models\\bmi_model")

app = Flask(__name__)
CORS(app)

@app.route("/predict",methods=['POST'])
def post_image():
    data = request.json.get("features")
    print(data)
    features = get_face_encoding(data)
    result = predict_height_width_BMI(features,height_model,weight_model,bmi_model)
    print(result)
    return jsonify(result),200

if __name__ == "__main__":
    app.run(debug=False)
