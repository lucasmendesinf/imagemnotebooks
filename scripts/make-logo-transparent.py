from collections import deque
from pathlib import Path

from PIL import Image, ImageFilter


SRC = Path("assets/img/logo-imagem-notebooks.png")
OUT = Path("assets/img/logo-imagem-notebooks-transparente.png")


def main() -> None:
    img = Image.open(SRC).convert("RGBA")
    width, height = img.size
    pixels = img.load()
    background = [[False] * width for _ in range(height)]
    queue: deque[tuple[int, int]] = deque()

    def is_background(pixel: tuple[int, int, int, int]) -> bool:
        red, green, blue, alpha = pixel
        brightest = max(red, green, blue)
        darkest = min(red, green, blue)
        return alpha > 0 and brightest < 92 and (brightest - darkest) < 34

    def add(x: int, y: int) -> None:
        if 0 <= x < width and 0 <= y < height and not background[y][x] and is_background(pixels[x, y]):
            background[y][x] = True
            queue.append((x, y))

    for x in range(width):
        add(x, 0)
        add(x, height - 1)
    for y in range(height):
        add(0, y)
        add(width - 1, y)

    while queue:
        x, y = queue.popleft()
        add(x + 1, y)
        add(x - 1, y)
        add(x, y + 1)
        add(x, y - 1)

    alpha = Image.new("L", (width, height), 255)
    alpha_pixels = alpha.load()
    for y in range(height):
        for x in range(width):
            if background[y][x]:
                alpha_pixels[x, y] = 0

    alpha = alpha.filter(ImageFilter.GaussianBlur(0.6))
    result = img.copy()
    result.putalpha(alpha)
    result.save(OUT, optimize=True)
    print(f"{width}x{height} -> {OUT}")


if __name__ == "__main__":
    main()
