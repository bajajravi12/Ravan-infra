import sys
import os

# Add the current directory to sys.path so it can find the rqrv package
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

from rqrv.main import main

if __name__ == "__main__":
    main()
