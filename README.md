# Conversational-AI-Prototyping-Tool

CS 5999 FA20

## Workflow Draft
Workflow draft First Version(Ignore this version) https://drive.google.com/file/d/1j4Dyc8r2s1QNULw6P406jrJL6DGQwi8M/view?usp=sharingn: 

## Presentation Link
https://docs.google.com/presentation/d/18CTpnSbe188IPT708MPVBMibzLubW-1Snj4YljoddEM/edit?usp=sharing

## References
- flask+react+mongodb env setting: https://dev.to/kouul/frmp-stack-5g9

## Dependencies
- React, AntDesign (Frontend), Axios(Frontend connection to Backend)
- flask CORS, flask (Backend)
- Pytorch, transformers (NLP)

## Project Hierarchy
- Folder backend
    - main.py (the backend main code)
    - google_auth.py (authentication code)
- Folder frontend
    - /src 
        - /components (including all compoments like writing cells, note cells, NLP result cells, etc)
        - App.js (main page rendering)

## How to Launch
- Direct to frontend folder
    - In terminal, run ``` yarn start ```
- Direct to backend folder
    - In terminal, run ``` python3 main.py```
## Current Bugs
- Deleting writing cells still doesn't function properly in a case if deleting the first non-empty writing cell
- Folding the user log-in panel has displaying issues