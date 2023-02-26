package com.p2.repository;

import java.util.List;

import org.hibernate.metamodel.model.convert.spi.JpaAttributeConverter;

import com.p2.domain.LeadtimeSearchVO;

public interface LeadtimeSearchRepository extends JpaAttributeConverter<LeadtimeSearchVO, Integer> {

	List<LeadtimeSearchVO> getSearch();
	
	

}
