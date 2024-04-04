const { test, expect } = require('@jest/globals')
const { normalizeURL, getURLsFromHTML } = require('./crawl.js')

test('normalizeURL slash', () => {
    expect(normalizeURL("https://blog.boot.dev/path/")).toBe("blog.boot.dev/path");
  });


  test('normalizeURL slash', () => {
    expect(normalizeURL("https://blog.boot.dev/path/")).toBe("blog.boot.dev/path");
  });

  test('normalizeURL no-slash', () => {
    expect(normalizeURL("https://blog.boot.dev/path")).toBe("blog.boot.dev/path");
  });

  test('normalizeURL capitals', () => {
    expect(normalizeURL("https://BLOG.boot.dev/path/")).toBe("blog.boot.dev/path");
  });

  test('normalizeURL http', () => {
    expect(normalizeURL("http://blog.boot.dev/path/")).toBe("blog.boot.dev/path");
  });

  test('getURLsFromHTML general', () => {
    const htmlBody = '<html><body><a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a></body></html>'
    expect(getURLsFromHTML(htmlBody, 'https://blog.boot.dev')).toEqual(["https://blog.boot.dev/"]);
  });

  test('getURLsFromHTML multiple links, relative to absolute', () => {
    const htmlBody = '<html><body><a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a><a href="/about/"><span>About</span></a></body></html>'
    expect(getURLsFromHTML(htmlBody, 'https://blog.boot.dev')).toEqual(["https://blog.boot.dev/", "https://blog.boot.dev/about/"]);
  });

  test('getURLsFromHTML both', () => {
    const inputURL = 'https://blog.boot.dev'
    const inputBody = '<html><body><a href="/path/one"><span>Boot.dev></span></a><a href="https://other.com/path/one"><span>Boot.dev></span></a></body></html>'
    const actual = getURLsFromHTML(inputBody, inputURL)
    const expected = [ 'https://blog.boot.dev/path/one', 'https://other.com/path/one' ]
    expect(actual).toEqual(expected)
  })
  
  test('getURLsFromHTML handle error', () => {
    const inputURL = 'https://blog.boot.dev'
    const inputBody = '<html><body><a href="path/one"><span>Boot.dev></span></a></body></html>'
    const actual = getURLsFromHTML(inputBody, inputURL)
    const expected = [ ]
    expect(actual).toEqual(expected)
  })
  