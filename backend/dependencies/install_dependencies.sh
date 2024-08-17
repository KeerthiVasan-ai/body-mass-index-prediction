echo "Starting the Dependencies Installer"

sudo apt-get install -y python3-pip
PYTHON_VERSION=$(python3 --version 2>&1 | awk '{print $2}' | cut -d'.' -f1,2)
echo "Detected Python version: $PYTHON_VERSION"

git clone https://github.com/davisking/dlib
cd dlib
python3 setup.py install

echo "Installing Python Dependencies"

pip3 install -r requirements.txt


echo "Completed Installation"
