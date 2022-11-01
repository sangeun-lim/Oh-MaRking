package com.ssafy.ohmarking.repository;

import com.ssafy.ohmarking.entity.OMR;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OMRRepository extends JpaRepository<OMR, Long> {
//    fidById 했는데 Optional 조건 필요없고 어차피 id에 해당하는 OMR은 하나라서 아래 구문 사용
    OMR findAllById(Long id) throws Exception;
}
