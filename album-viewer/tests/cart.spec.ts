import { test, expect } from '@playwright/test'

test.describe('Cart Management Feature', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app
    await page.goto('/')
    
    // Wait for albums to load
    await page.waitForSelector('.album-card', { timeout: 10000 })
  })

  test('AC-1: Cart icon is visible in the header at all times', async ({ page }) => {
    const cartIcon = page.locator('.cart-icon')
    await expect(cartIcon).toBeVisible()
  })

  test('AC-2: Cart icon displays a badge with the number of items (hidden when 0)', async ({ page }) => {
    // Initially, badge should not be visible when cart is empty
    const badge = page.locator('.cart-icon .badge')
    await expect(badge).not.toBeVisible()

    // Add an album to cart
    const firstAlbumAddButton = page.locator('.album-card .btn-primary').first()
    await firstAlbumAddButton.click()

    // Wait for badge to appear
    await expect(badge).toBeVisible()
    await expect(badge).toHaveText('1')
  })

  test('AC-3: Clicking cart icon opens a drawer showing cart contents', async ({ page }) => {
    const cartIcon = page.locator('.cart-icon')
    const cartDrawer = page.locator('.cart-drawer')

    // Cart drawer should not be visible initially
    await expect(cartDrawer).not.toBeVisible()

    // Click cart icon
    await cartIcon.click()

    // Cart drawer should be visible
    await expect(cartDrawer).toBeVisible()
    await expect(cartDrawer.locator('h2')).toHaveText('Your Cart')
  })

  test('AC-4: Each album card has an "Add to Cart" button', async ({ page }) => {
    const albumCards = page.locator('.album-card')
    const firstCard = albumCards.first()
    const addButton = firstCard.locator('.btn-primary')

    await expect(addButton).toBeVisible()
    await expect(addButton).toHaveText('Add to Cart')
  })

  test('AC-5: Clicking "Add to Cart" adds the album to the cart and updates the badge count', async ({ page }) => {
    const badge = page.locator('.cart-icon .badge')
    const firstAlbumAddButton = page.locator('.album-card .btn-primary').first()

    // Add first album
    await firstAlbumAddButton.click()
    await expect(badge).toHaveText('1')

    // Add second album
    const secondAlbumAddButton = page.locator('.album-card .btn-primary').nth(1)
    await secondAlbumAddButton.click()
    await expect(badge).toHaveText('2')
  })

  test('AC-6: Albums already in cart show visual indication', async ({ page }) => {
    const firstAlbumAddButton = page.locator('.album-card .btn-primary').first()

    // Button should say "Add to Cart" initially
    await expect(firstAlbumAddButton).toHaveText('Add to Cart')

    // Add to cart
    await firstAlbumAddButton.click()

    // Button should change to "In Cart ✓"
    await expect(firstAlbumAddButton).toHaveText('In Cart ✓')
    await expect(firstAlbumAddButton).toHaveClass(/in-cart/)
  })

  test('AC-7: Cart drawer displays album image, title, artist, and price for each item', async ({ page }) => {
    // Add an album to cart
    const firstAlbumAddButton = page.locator('.album-card .btn-primary').first()
    
    // Get album details from the card
    const firstAlbumCard = page.locator('.album-card').first()
    const albumTitle = await firstAlbumCard.locator('.album-title').textContent()
    const albumArtist = await firstAlbumCard.locator('.album-artist').textContent()
    
    await firstAlbumAddButton.click()

    // Open cart drawer
    await page.locator('.cart-icon').click()

    // Check cart item has all required elements
    const cartItem = page.locator('.cart-item').first()
    await expect(cartItem.locator('.item-image img')).toBeVisible()
    await expect(cartItem.locator('.item-title')).toHaveText(albumTitle!)
    await expect(cartItem.locator('.item-artist')).toHaveText(albumArtist!)
    await expect(cartItem.locator('.item-price')).toBeVisible()
  })

  test('AC-8: Each cart item has a remove button that removes it from the cart', async ({ page }) => {
    // Add two albums to cart
    await page.locator('.album-card .btn-primary').first().click()
    await page.locator('.album-card .btn-primary').nth(1).click()

    // Open cart drawer
    await page.locator('.cart-icon').click()

    // Verify 2 items in cart
    await expect(page.locator('.cart-item')).toHaveCount(2)
    await expect(page.locator('.cart-icon .badge')).toHaveText('2')

    // Click remove button on first item
    await page.locator('.cart-item .remove-btn').first().click()

    // Verify only 1 item remains
    await expect(page.locator('.cart-item')).toHaveCount(1)
    await expect(page.locator('.cart-icon .badge')).toHaveText('1')
  })

  test('AC-9: Cart displays total price of all items', async ({ page }) => {
    // Add albums to cart
    await page.locator('.album-card .btn-primary').first().click()
    await page.locator('.album-card .btn-primary').nth(1).click()

    // Open cart drawer
    await page.locator('.cart-icon').click()

    // Check total price is displayed
    const totalPrice = page.locator('.total-price')
    await expect(totalPrice).toBeVisible()
    
    // Verify it's a valid price format (starts with $ and has decimal)
    const totalText = await totalPrice.textContent()
    expect(totalText).toMatch(/^\$\d+\.\d{2}$/)
  })

  test('AC-10: Cart state persists across page refreshes', async ({ page }) => {
    // Add an album to cart
    await page.locator('.album-card .btn-primary').first().click()
    await expect(page.locator('.cart-icon .badge')).toHaveText('1')

    // Reload the page
    await page.reload()
    
    // Wait for albums to load
    await page.waitForSelector('.album-card')

    // Cart should still have 1 item
    await expect(page.locator('.cart-icon .badge')).toHaveText('1')
    
    // Clear cart for cleanup
    await page.locator('.cart-icon').click()
    
    // Setup dialog handler before clicking
    page.on('dialog', dialog => dialog.accept())
    await page.locator('.clear-btn').click()
  })

  test('AC-11: Empty cart shows appropriate message', async ({ page }) => {
    // Open cart drawer (should be empty)
    await page.locator('.cart-icon').click()

    // Check for empty cart message
    const emptyMessage = page.locator('.empty-cart p')
    await expect(emptyMessage).toBeVisible()
    await expect(emptyMessage).toHaveText('Your cart is empty')
  })

  test('AC-12: Cart drawer can be closed by clicking the close button', async ({ page }) => {
    // Open cart drawer
    await page.locator('.cart-icon').click()
    await expect(page.locator('.cart-drawer')).toBeVisible()

    // Close cart drawer
    await page.locator('.close-btn').click()
    await expect(page.locator('.cart-drawer')).not.toBeVisible()
  })

  test('Cart drawer can be closed by clicking overlay', async ({ page }) => {
    // Open cart drawer
    await page.locator('.cart-icon').click()
    await expect(page.locator('.cart-drawer')).toBeVisible()

    // Close by clicking overlay
    await page.locator('.drawer-overlay').click()
    await expect(page.locator('.cart-drawer')).not.toBeVisible()
  })

  test('Clear cart button removes all items', async ({ page }) => {
    // Add multiple albums to cart
    await page.locator('.album-card .btn-primary').first().click()
    await page.locator('.album-card .btn-primary').nth(1).click()
    
    // Open cart drawer
    await page.locator('.cart-icon').click()
    
    // Verify items are in cart
    await expect(page.locator('.cart-item')).toHaveCount(2)
    
    // Setup dialog handler to accept confirmation
    page.on('dialog', dialog => dialog.accept())
    
    // Click clear cart
    await page.locator('.clear-btn').click()
    
    // Verify cart is empty
    await expect(page.locator('.empty-cart')).toBeVisible()
    await expect(page.locator('.cart-icon .badge')).not.toBeVisible()
  })

  test('Take screenshots for documentation', async ({ page }) => {
    // Screenshot 1: Initial state with albums
    await page.screenshot({ 
      path: 'tests/screenshots/01-album-list.png',
      fullPage: true 
    })

    // Screenshot 2: After adding album to cart (badge visible)
    await page.locator('.album-card .btn-primary').first().click()
    await page.screenshot({ 
      path: 'tests/screenshots/02-album-added-to-cart.png',
      fullPage: true 
    })

    // Screenshot 3: Cart drawer with items
    await page.locator('.album-card .btn-primary').nth(1).click()
    await page.locator('.cart-icon').click()
    await page.screenshot({ 
      path: 'tests/screenshots/03-cart-drawer-with-items.png',
      fullPage: true 
    })

    // Screenshot 4: Empty cart
    page.on('dialog', dialog => dialog.accept())
    await page.locator('.clear-btn').click()
    await page.screenshot({ 
      path: 'tests/screenshots/04-empty-cart.png',
      fullPage: true 
    })
  })
})
