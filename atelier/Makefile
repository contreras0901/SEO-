# Atelier Launch Co. platform: common tasks.  Run `make help`.
PY ?= python3

help:
	@echo "make setup     install Python packages and the headless browser"
	@echo "make fonts     download the brand fonts (Cormorant Garamond, Jost)"
	@echo "make build     build every PDF + companion zips into publishing/dist/"
	@echo "make social    render Instagram/TikTok designs into social/dist/"
	@echo "make test      run the delivery-system tests"
	@echo "make masters   copy built files into delivery/masters/ (what the service sends)"
	@echo "make run       start the delivery service locally (needs env vars, see .env.example)"

setup:
	$(PY) -m pip install -r requirements.txt
	$(PY) -m playwright install chromium

fonts:
	$(PY) publishing/scripts/get_fonts.py

modules: fonts
	cd publishing && for m in m1 m2 m3 m4; do $(PY) src/modules/$$m.py; done

build: fonts modules
	cd publishing && $(PY) build_masterclass.py && $(PY) make_companions.py
	@ls -la publishing/dist

social: fonts
	cd social && $(PY) make_social.py

test:
	cd delivery && $(PY) tests/test_flow.py

masters: build
	cp publishing/dist/*.pdf publishing/dist/*.zip delivery/masters/
	@ls -la delivery/masters

run:
	cd delivery && gunicorn -w 2 -b 0.0.0.0:8000 app:app
