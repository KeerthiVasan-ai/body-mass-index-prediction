echo "Starting the Dependencies Installer"

sudo apt-get install -y python3-pip
PYTHON_VERSION=$(python3 --version 2>&1 | awk '{print $2}' | cut -d'.' -f1,2)
echo "Detected Python version: $PYTHON_VERSION"

echo "Installing Dlib"

if [[ "$PYTHON_VERSION" == "3.7" ]]; then
    python -m pip install dlib-19.22.99-cp37-cp37m-win_amd64.whl    

elif [[ "$PYTHON_VERSION" == "3.8" ]]; then
    python -m pip install dlib-19.22.99-cp38-cp38-win_amd64.whl

elif [[ "$PYTHON_VERSION" == "3.9" ]]; then
    python -m pip install dlib-19.22.99-cp39-cp39-win_amd64.whl

elif [[ "$PYTHON_VERSION" == "3.10" ]]; then
    python -m pip install dlib-19.22.99-cp310-cp310-win_amd64.whl

elif [[ "$PYTHON_VERSION" == "3.11" ]]; then
    python -m pip install dlib-19.24.1-cp311-cp311-win_amd64.whl

elif [[ "$PYTHON_VERSION" == "3.12" ]]; then
    python -m pip install dlib-19.24.99-cp312-cp312-win_amd64.whl

else
    echo "Unsupported Python version. Please use Python 3.9 or 3.10."
fi

echo "Installing Python Dependencies"

pip3 install -r requirements.txt


echo "Completed Installation"
