# ExamPortal

**ExamPortal** is a sleek and user-friendly online testing platform designed for students and educators. Built as a static site using modern web practices, it runs directly from GitHub Pages without requiring any backend infrastructure.

Visit the live demo here:  
https://ppurnima022-cmyk.github.io/online-exam-portal/EXAM-PORTAL/index.html

---

##  Features

### Tests and Study Tools
- **Tests Completed**: Shows percentage of completed tests (currently displays 0% in the demo).
- **Average Score**: Displays user's average score across tests.

### Upcoming Tests
- Displays upcoming examination schedule, e.g.:
  - *Mathematics Midterm – Dec 15, 2024*
  - *Physics Final – Dec 18, 2024*
  - *Chemistry Quiz – Dec 20, 2024*

### Study Materials
- Quick-access links to study guides, including:
  - Mathematics Notes  
  - Physics Formulas  
  - Chemistry Guide  
  - Programming Basics  

### Why Choose ExamPortal?
- **Fast & Reliable**: Optimized to load quickly, ensuring seamless test-taking.
- **Secure Testing**: Built with fairness and authenticity in mind.
- **Detailed Analytics**: Performance tracking and analysis to highlight areas of improvement.
- **Mobile Friendly**: Fully responsive design supporting a wide range of devices.

---
```markdown

##  Project Structure

```

EXAM-PORTAL/
├── index.html            # Main entry point with static UI and content
├── assets/               # (Optional) Static assets like images or styles
└── README.md             # This documentation file

````

*(Adjust the structure if your repository includes more files like CSS, JS, images, etc.)*

---

##  How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/ppurnima022-cmyk/online-exam-portal.git
   cd online-exam-portal/EXAM-PORTAL
````

2. Open `index.html` directly in your browser (no server required) OR:
   Serve locally using a static HTTP server (recommended for better compatibility):

   ```bash
   # Using Python
   python -m http.server 8000
   # Or using Node (http-server)
   npx http-server
   ```

3. Visit `http://localhost:8000` in your browser to explore the app.

---

## Customization & Improvements

* **Dynamic Data**: Integrate API endpoints or services to fetch real user scores and schedule dynamically.
* **User Authentication**: Add login/signup flows to personalize student dashboards.
* **Backend Support**: Consider using serverless functions (e.g., Firebase, Netlify Functions) to handle test submissions, data storage, and scoring.
* **Enhanced Styling**: Use CSS frameworks (Tailwind, Bootstrap) or modern JS frameworks for better UX.

---

## Author

**Purnima**
GitHub: [ppurnima022-cmyk](https://github.com/ppurnima022-cmyk)
Project live at: [https://ppurnima022-cmyk.github.io/online-exam-portal/EXAM-PORTAL/index.html](https://ppurnima022-cmyk.github.io/online-exam-portal/EXAM-PORTAL/index.html)

---

**© 2024 ExamPortal. All rights reserved.**

```
