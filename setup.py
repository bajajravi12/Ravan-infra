import os
from setuptools import setup, find_packages

setup(
    name="rqrv",
    version="3.6.5",
    author="Ravan",
    description="The Ultimate Bug Host Hunter Tool (RQRV)",
    long_description=open("README.md").read() if os.path.exists("README.md") else "",
    long_description_content_type="text/markdown",
    packages=find_packages(),
    include_package_data=True,
    install_requires=[
        "rich",
        "requests",
        "urllib3",
        "httpx[http2]",
        "ipwhois"
    ],
    entry_points={
        "console_scripts": [
            "rq=rqrv.main:main"
        ]
    },
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires='>=3.6',
)
