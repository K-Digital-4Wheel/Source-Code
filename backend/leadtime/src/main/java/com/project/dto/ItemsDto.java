package com.project.dto;

import com.project.domain.Basket;
import com.project.domain.Items;
import com.project.domain.Member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class ItemsDto {
	
	@Builder
	@NoArgsConstructor
	@AllArgsConstructor
	@Data
	public static class Request {
		private Long id;
		private String subject;
		private String machinery;
		private String assembly;
		private String items;
		private String part1;
		private String part2;	//??
		private String category;
		private String leadtime;
		private String client;	//발주처
		private String esti_unit_price;	//견적단가
		private String currency;	//견적화폐
		
		public Items toEntity() {
			Items item = Items.builder()
					.id(id)
					.subject(subject)
					.machinery(machinery)
					.assembly(assembly)
					.items(items)
					.part1(part1)
					.part2(part2)
					.category(category)
					.leadtime(leadtime)
					.client(client)
					.esti_unit_price(esti_unit_price)
					.currency(currency)
					.build();
			return item;
		}
	}

}
