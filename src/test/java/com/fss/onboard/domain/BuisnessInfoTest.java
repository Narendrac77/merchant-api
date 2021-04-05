package com.fss.onboard.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.fss.onboard.web.rest.TestUtil;

public class BuisnessInfoTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BuisnessInfo.class);
        BuisnessInfo buisnessInfo1 = new BuisnessInfo();
        buisnessInfo1.setId(1L);
        BuisnessInfo buisnessInfo2 = new BuisnessInfo();
        buisnessInfo2.setId(buisnessInfo1.getId());
        assertThat(buisnessInfo1).isEqualTo(buisnessInfo2);
        buisnessInfo2.setId(2L);
        assertThat(buisnessInfo1).isNotEqualTo(buisnessInfo2);
        buisnessInfo1.setId(null);
        assertThat(buisnessInfo1).isNotEqualTo(buisnessInfo2);
    }
}
