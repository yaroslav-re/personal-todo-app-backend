const reverse = require("../utils/forTesting").reverse;

test("reverse of a", () => {
  const result = reverse("a");

  expect(result).toBe("a");
});

test("reverse of react", () => {
  const result = reverse("react");

  expect(result).toBe("tcaer");
});

test("reverse of releveler", () => {
  const result = reverse("releveler");

  expect(result).toBe("releveler");
});

// посмотреть unit tests react
// побробовать починить создание todos
