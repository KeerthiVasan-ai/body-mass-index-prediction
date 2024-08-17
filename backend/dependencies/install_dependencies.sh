echo "Starting the Dependencies Installer"

sudo apt-get install -y python3-pip
PYTHON_VERSION=$(python3 --version 2>&1 | awk '{print $2}' | cut -d'.' -f1,2)
echo "Detected Python version: $PYTHON_VERSION"

sudo apt-get install build-essential cmake
sudo apt-get install libgtk-3-dev
sudo apt-get install libboost-all-dev

echo "Installing Python Dependencies"

pip3 install -r requirements.txt

echo "Completed Installation"
