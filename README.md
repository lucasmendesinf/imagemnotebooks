# Imagem Notebooks

Nova versao estatica da home da Imagem Notebooks, preparada para substituir a pagina `index.php` atual.

## Estrutura

- `index.php`: pagina principal para substituir a URL atual.
- `index.html`: copia estatica para preview local sem PHP.
- `assets/css/styles.css`: estilos responsivos.
- `assets/js/main.js`: menu mobile e ano automatico.
- `assets/img/hero-workbench.png`: imagem hero gerada para o projeto.

## Visualizacao local

Abra `index.html` no navegador ou sirva a pasta com qualquer servidor local/PHP. Tambem ha um servidor simples em Node:

```bash
node scripts/serve-static.js
```
