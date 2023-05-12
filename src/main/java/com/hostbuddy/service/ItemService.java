package com.hostbuddy.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hostbuddy.entity.Item;
import com.hostbuddy.repository.ItemRepository;

@Service
public class ItemService {
	private ItemRepository itemRepository;

	@Autowired
	public ItemService(ItemRepository itemRepository) {
		this.itemRepository = itemRepository;
	}

	public Item addItem(Item item) {
		return itemRepository.save(item);
	}

	public List<Item> getItems() {
		return itemRepository.findAll();
	}

	public Optional<Item> getItemById(Long id) {
		return itemRepository.findById(id);
	}

	public Optional<Item> updateItem(Long id, Item item) {
		Optional<Item> optionalItem = itemRepository.findById(id);
		if (optionalItem.isPresent()) {
			Item existingItem = optionalItem.get();
			existingItem.setName(item.getName());
			existingItem.setDescription(item.getDescription());
			Item savedItem = itemRepository.save(existingItem);
			return Optional.of(savedItem);
		} else {
			return Optional.empty();
		}
	}

	public boolean deleteItem(Long id) {
		Optional<Item> optionalItem = itemRepository.findById(id);
		if (optionalItem.isPresent()) {
			itemRepository.delete(optionalItem.get());
			return true;
		} else {
			return false;
		}
	}

	public List<Item> searchItems(String name) {
		return itemRepository.findByNameContaining(name);
	}
}