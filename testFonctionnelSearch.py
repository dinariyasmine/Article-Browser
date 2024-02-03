from selenium import webdriver
import time

# Create a WebDriver instance (in this case, using Chrome)
driver = webdriver.Chrome()

# Open the page with the React component
driver.get("http://localhost:3000/UserSpace")
time.sleep(2)

# Locate the search input field by its CSS selector
search_input = driver.find_element("css selector", "input[type='search']")

# Input text into the search input field
search_input.send_keys("Article") 

# Locate the search button by its CSS selector
search_button = driver.find_element("css selector", "button")

# Click the search button
search_button.click()

# Allow some time for the search to happen (you might need to adjust the sleep duration)
time.sleep(4)

# Close the browser window
driver.quit()
