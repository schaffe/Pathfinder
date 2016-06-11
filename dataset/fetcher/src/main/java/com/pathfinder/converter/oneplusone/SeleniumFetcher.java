package com.pathfinder.converter.oneplusone;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.ArrayDeque;
import java.util.Queue;
import java.util.concurrent.*;
import java.util.concurrent.locks.ReentrantReadWriteLock;

public class SeleniumFetcher {
    private static final Logger log = LoggerFactory.getLogger(SeleniumFetcher.class);
    ExecutorService executor;
    BlockingQueue<FirefoxDriver> drivers;
    Queue<Callable<String>> tasks;
    ReentrantReadWriteLock lock = new ReentrantReadWriteLock();

    public SeleniumFetcher(int concurrentInstances) {
        lock.writeLock().lock();
        final int instances = concurrentInstances < 1 ? 1 : concurrentInstances > 4 ? 4 : concurrentInstances;
        executor = Executors.newFixedThreadPool(instances);
        drivers = new ArrayBlockingQueue<FirefoxDriver>(instances);
        tasks = new ArrayDeque<>();

        for (int i = 0; i < instances; i++) {
            executor.submit(() -> {
                lock.writeLock().lock();
                drivers.offer(new FirefoxDriver());
                lock.writeLock().unlock();
            });
        }
        lock.writeLock().unlock();

    }

    public void crawl(String url) throws InterruptedException {
        tasks.add(() -> {
            lock.readLock().lock();
            FirefoxDriver driver = drivers.poll();
            log.info("Crawling page " + url);

            driver.get(url);
            WebElement element = (new WebDriverWait(driver, 50)).until((WebDriver d) -> {
                return driver.findElement(By.cssSelector(".text"));
            });

            log.info(element.getText());


            log.info("Page crawling finished " + url);


            try {
                drivers.put(driver);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            lock.readLock().unlock();
            return "";
        });
    }

    public void start() throws InterruptedException {
        executor.invokeAll(tasks);
        executor.shutdown();
        lock.writeLock().lock();
        for (FirefoxDriver driver : drivers) {
            log.info("driver.quit()");
            driver.quit();
        }
        lock.writeLock().unlock();
    }

    public static void main(String[] args) throws IOException, InterruptedException {

        SeleniumFetcher seleniumFetcher = new SeleniumFetcher(2);
        for (int i = 1; i < 4; i++) {
            seleniumFetcher.crawl("http://kraina.1plus1.ua/story/friends/" + i);
        }
        seleniumFetcher.start();

        // And now use this to visit Google

        // Alternatively the same thing can be done like this
        // driver.navigate().to("http://www.google.com");

        // Find the text input element by its name

        // Enter something to search for
//        element.sendKeys("Cheese!");
//
//        // Now submit the form. WebDriver will find the form for us from the element
//        element.submit();
//
//        // Check the title of the page
//        System.out.println("Page title is: " + driver.getTitle());
//
//        // Google's search is rendered dynamically with JavaScript.
//        // Wait for the page to load, timeout after 10 seconds
//        (new WebDriverWait(driver, 10)).until((WebDriver d) -> {
//            return d.getTitle().toLowerCase().startsWith("cheese!");
//        });
//
//        // Should see: "cheese! - Google Search"
//        System.out.println("Page title is: " + driver.getTitle());
//
//        //Close the browser
//        driver.quit();
    }
}
