import numpy as np

def patch_asscalar(a):
    return a.item()

setattr(np, "asscalar", patch_asscalar)

def predict_height_width_BMI(features,height_model,weight_model,bmi_model)->dict:
    process_feature = np.expand_dims(features,axis=0)
    height = np.asscalar(np.exp(height_model.predict(process_feature)))
    weight = np.asscalar(np.exp(weight_model.predict(process_feature)))
    bmi = np.asscalar(np.exp(bmi_model.predict(process_feature)))
    return {'height':height,'weight':weight,'bmi':bmi}