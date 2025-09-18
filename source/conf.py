# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information


# If extensions (or modules to document with autodoc) are in another directory,
# add these directories to sys.path here.
import os
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

# # 配置PlantUML
plantuml = 'java -jar ../plantuml/plantuml-1.2025.7.jar'

project = "操作手册"
copyright = 'LoyoTech'
author = 'zbr'

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

extensions = [
    'sphinx.ext.duration',
    'sphinx.ext.doctest',
    'sphinxcontrib.plantuml',
    'sphinx_design',

]

templates_path = ['_templates']
exclude_patterns = []



# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

# html_theme = 'pyramid'
# html_theme = 'alabaster'
html_theme = 'furo'


html_static_path = ['_static']

html_css_files = [
    'custom.css',
    'dropdown.css',
]

html_js_files = [
    "toc-toggle.js",
    "kill-back-to-top.js",
    ]