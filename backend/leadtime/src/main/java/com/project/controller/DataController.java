package com.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.domain.Basket;
import com.project.domain.Items;
import com.project.dto.BasketDto;
import com.project.dto.ItemsDto;
import com.project.service.DataService;

@RestController
public class DataController {
	
	@Autowired
	private DataService dataService;
	
	//app.js 데이터 호출
	@GetMapping("/data/get")
	public List<Items> getData(){
		return dataService.getData();
	}
	
	//검색한 데이터 호출
	@PostMapping("/data/search")
	public List<Items> getResult(@RequestBody String[] search){
		return dataService.getResult(search);
	}
	
	//아이템 추가(admin 화면)
	@PostMapping("/data/additem")
	public void addItem(@RequestBody ItemsDto.Request items) {
		dataService.addItem(items);
	}

	//장바구니 추가
	@PostMapping("/data/basket")
	public void addBasket(@RequestBody int[][] basket, BasketDto.Request dto) {	//장바구니 추가할 때 dto사용해봄
		dataService.addBasket(basket, dto);
	}
	
	//아이디별로 장바구니 목록 들고오기
	@GetMapping("/data/getbasket")
	public List<Basket> getBasket(Authentication authentication){	//로그인 정보가 담겨있는 Authentication 사용
		return dataService.getBasket(authentication);
	}
	//회원가입을 한다면 회원정보가 파라미터로 들어가야됨
	
	//장바구니 삭제
	@PostMapping("/data/delbasket")
	public void delBasket(@RequestBody int[] idNum) {
		dataService.delBasket(idNum);
	}
}
