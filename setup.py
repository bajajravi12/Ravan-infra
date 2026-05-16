import os
from setuptools import setup, find_packages

setup(
    name="rq-tool",
    version="3.0.0",
    author="Ravan",
    description="The Ultimate Bug Host Hunter Tool (RQ)",
    long_description=open("README.md").read() if os.path.exists("README.md") else "",
    long_description_content_type="text/markdown",
    packages=find_packages(),
    install_requires=[
        "rich",
        "requests",
        "urllib3",
        "ipaddress",
        "httpx[http2]",
        "ipwhois",
    ],
    entry_points={
        "console_scripts": [
            "rq=rq.main:main",
        ],
    },
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires=">=3.7",
)
