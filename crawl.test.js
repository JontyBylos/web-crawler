const { test, expect } = require('@jest/globals')
const { normalizeURL } = require('./crawl.js')

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
