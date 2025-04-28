# ml/setup.py
from setuptools import setup, find_packages

setup(
  name="autodeal_ml",
  version="0.1",
  packages=find_packages(),
  install_requires=[
    "pandas","scikit-learn","joblib"   # etc.
  ],
)
