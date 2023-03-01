package com.project.service;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestBody;

import com.project.domain.Basket;
import com.project.domain.Items;
import com.project.dto.BasketDto;
import com.project.dto.ItemsDto;

public interface DataService {

	public List<Items> getData();

	public List<Items> getResult(String[] search);
	
	public void addItem(@RequestBody ItemsDto.Request items);

	public void addBasket(@RequestBody int[][] basket, BasketDto.Request dto);

	public List<Basket> getBasket(Authentication authentication);

	public void delBasket(int[] idNum);
	
	

}
