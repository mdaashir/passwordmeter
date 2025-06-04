# Password Meter

A sophisticated password strength checker that provides real-time feedback on password security. This tool helps users create stronger passwords by analyzing various complexity factors and providing detailed scoring.

## 🌟 Features

- Real-time password strength evaluation
- Detailed scoring system based on multiple criteria:
  - Password length
  - Use of uppercase letters
  - Use of lowercase letters
  - Numbers
  - Symbols
  - Middle numbers or symbols
  - Requirements compliance
- Visual strength indicator
- Password visibility toggle
- Comprehensive feedback on password components
- Mobile-responsive design

## 🚀 Getting Started

### Prerequisites

No special prerequisites are required. This is a client-side application that runs entirely in the browser.

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mdaashir/passwordmeter.git
cd passwordmeter
```

2. Open `index.html` in your web browser

### Docker Support

The project includes Docker support for easy deployment:

1. Build the Docker image:
```bash
docker build -t passwordmeter .
```

2. Run the container:
```bash
docker run -p 80:80 passwordmeter
```

3. Access the application at `http://localhost`

## 🔍 How It Works

The password meter evaluates passwords based on various criteria and provides a score from 0-100%. The evaluation includes:

### Additions (Positive Factors)
- Number of characters (n*4)
- Uppercase letters ((len-n)*2)
- Lowercase letters ((len-n)*2)
- Numbers (n*4)
- Symbols (n*6)
- Middle numbers or symbols (n*2)
- Requirements compliance (n*2)

### Deductions (Negative Factors)
- Letters only
- Numbers only
- Repeated characters
- Consecutive uppercase letters
- Consecutive lowercase letters

## 🛠️ Technical Stack

- HTML5
- CSS3
- JavaScript (Vanilla)
- Docker for containerization
- Nginx as web server (in Docker)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔒 Security

This tool runs entirely on the client side. No passwords are transmitted or stored anywhere.